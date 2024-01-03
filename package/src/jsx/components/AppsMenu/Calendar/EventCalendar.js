import React, { Component } from "react";
import { Col, Row, Card } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import { stringify } from 'flatted';

class EventCalendar extends Component {

   state = {
      calendarEvents: [
         {
            title: "Atlanta Monster",
            start: new Date("2023-09-07 00:00"),
            id: "99999991",
         },
         {
            title: "My Favorite Movie",
            start: new Date("2023-09-11 00:00"),
            id: "99999992",
         },
         {
            title: "Enggement Function",
            start: new Date("2023-09-17 00:00"),
            id: "99999993",
         },
         {
            title: "Marrige Function",
            start: new Date("2023-09-23 00:00"),
            id: "99999994",
         },
         {
            title: "Party With Friends",
            start: new Date("2023-09-26 00:00"),
            id: "99999995",
         },
         {
            title: "Atlanta Monster",
            start: new Date("2023-10-07 00:00"),
            id: "99999991",
         },
         {
            title: "My Favorite Movie",
            start: new Date("2023-10-11 00:00"),
            id: "99999992",
         },
         {
            title: "Enggement Function",
            start: new Date("2023-10-17 00:00"),
            id: "99999993",
         },
         {
            title: "Marrige Function",
            start: new Date("2023-10-23 00:00"),
            id: "99999994",
         },
         {
            title: "Party With Friends",
            start: new Date("2023-10-26 00:00"),
            id: "99999995",
         },
      ],
      events: [
         { title: "New Theme Release", id: "1", style:'primary' },
         { title: "My Event", id: "2", style:'warning' },
         { title: "Meet Manager", id: "3", style:'danger' },
         { title: "Create New Theme", id: "4", style:'info' },
         { title: "Project Launch ", id: "5", style:'dark' },
         { title: "Meeting", id: "6", style:'secondary' },       
      ],      
   };


  
   /**
    * adding dragable properties to external events through javascript
    */
   componentDidMount() {


      const existingDataString = localStorage.getItem('event');
      const existingData = existingDataString ? JSON.parse(existingDataString) : [];

      this.setState({
         calendarEvents: [...this.state.calendarEvents, ...existingData],

              

      });


      let draggableEl = document.getElementById("external-events");
      new Draggable(draggableEl, {
         itemSelector: ".fc-event",
         eventData: function (eventEl) {
            let title = eventEl.getAttribute("title");
            let id = eventEl.getAttribute("data");
            return {
               title: title,
               id: id,
            };
         },
      });
   }

   
  eventClick = (eventClick) => {
   // Create a copy of the event to track changes
   let updatedEvent = { ...eventClick.event };

   // Function to update the event properties
   const updateEventProperty = (property, value) => {
      updatedEvent = {
         ...updatedEvent,
         [property]: value,
      };
   };

   Alert.fire({
      title: eventClick.event.title,
      html: `
         <div class="table-responsive">
            <table class="table">
               <tbody>
                  <tr>
                     <td>Title</td>
                     <td><input type="text" value="${eventClick.event.title}" class="form-control" id="editTitle"></td>
                  </tr>
                  <tr>
                     <td>Start Time</td>
                     <td><input type="datetime-local" value="${eventClick.event.start.toISOString().slice(0, 16)}" class="form-control" id="editStartTime"></td>
                  </tr>
               </tbody>
            </table>
         </div>`,
      showCancelButton: true,
      confirmButtonClass: "btn btn-danger",
      cancelButtonClass: "btn btn-primary",
      confirmButtonText: "Save Changes",
      cancelButtonText: "Cancel",
   }).then((result) => {
      if (result.value) {
         // Update the event properties with the edited values
         updateEventProperty("title", document.getElementById("editTitle").value);
         updateEventProperty("start", new Date(document.getElementById("editStartTime").value));
         
         // Update the calendar event with the new values
         eventClick.event.setProp("title", updatedEvent.title);
         eventClick.event.setStart(updatedEvent.start);
         
         try {
            // Use flatted.stringify to safely handle circular references
            const existingDataString = localStorage.getItem('event');
            const existingData = existingDataString ? JSON.parse(existingDataString) : [];
      
            // Add the new entry to the array
            existingData.push({
               title: updatedEvent.title,

               start: updatedEvent.start,
            });      
            // Store the updated array in local storage
            localStorage.setItem('event', JSON.stringify(existingData));
            Alert.fire("Saved!", "Your changes have been saved.", "success");
         } catch (error) {
            console.error('Error stringifying the object:', error);
         }
      }
   });
};

   

   render() {
      return (
         <div className="animated fadeIn demo-app">
            <Row>
               <Col lg={3}>
                  <Card>
                     
                     <Card.Body>
                        <h4 className="card-intro-title mb-0">Calendar</h4>
                        <div id="external-events">
                           <p>Drag and drop your event or click in the calendar</p>
                           {this.state.events.map((event) => (
                              <div
                                 className={`fc-event external-event light btn-${event.style}`} data-class={`bg-${event.style}`}
                                 // className={`fc-event external-event light btn-primary`}
                                 title={event.title}
                                 data={event.id}
                                 key={event.id}
                              >
                                 <i className="fa fa-move" /><span>{event.title}</span>
                                 {/* {event.title} */}
                              </div>
                           ))}
                        </div>
                     </Card.Body>
                  </Card>
               </Col>

               <Col lg={9}>
                  <Card>
                     <Card.Body>
                        <div className="demo-app-calendar" id="mycalendartest">
                           <FullCalendar
                              defaultView="dayGridMonth"
                              headerToolbar={{
                                 start: "prev,next today",
                                 center: "title",
                                 end:"dayGridMonth,timeGridWeek,timeGridDay",
                              }}
                              rerenderDelay={10}
                              eventDurationEditable={false}
                              editable={true}
                              droppable={true}
                              plugins={[
                                 dayGridPlugin,
                                 timeGridPlugin,
                                 interactionPlugin,
                              ]}
                              ref={this.calendarComponentRef}
                              weekends={this.state.calendarWeekends}
                              events={this.state.calendarEvents}
                              eventDrop={this.drop}                              
                              eventReceive={this.eventReceive}
                              eventClick={this.eventClick}                              
                           />
                        </div>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
         </div>
      );
   }
}

export default EventCalendar;