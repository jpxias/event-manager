import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import CreateEventModal from "../../components/CreateEventModal/CreateEventModal.component";
import EventCard from "../../components/EventCard/EventCard.component";
import { useAuthContext } from "../../contexts/Auth.context";
import { useGraphQL } from "../../contexts/GraphQl.context";
import { Event } from "../../generated/graphql";
import { GraphQlSdk } from "../../graphql/GraphQlClient";
import "./EventManager.css";

const EventManagerScreen = () => {
  const { FindAllEvents } = GraphQlSdk;
  const { token } = useAuthContext();
  const [events, setEvents] = useState<Event[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [viewOnly, setViewOnly] = useState<boolean>(false);
  const { graphqlRequest } = useGraphQL();

  const fetchAllEvents = async () => {
    const data = await graphqlRequest(GraphQlSdk.FindAllEvents, { filter: {} }, true);
    if (data) setEvents(data.findAllEvents);
    // if (token) {
    //   FindAllEvents({ filter: {} }, { Authorization: token }).then((res) => {
    //     setEvents(res.findAllEvents);
    //   });
    // }
  };

  useEffect(() => {
    fetchAllEvents();
  }, [token]);

  const editEvent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, event: Event | null) => {
    e.stopPropagation();
    e.preventDefault();

    setViewOnly(false);
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const viewEvent = (event: Event) => {
    setViewOnly(true);
    setSelectedEvent(event);
    setModalOpen(true);
  };

  return (
    <>
      <CreateEventModal
        open={modalOpen}
        event={selectedEvent}
        handleClose={() => setModalOpen(false)}
        handleSubmit={() => {
          setModalOpen(false);
          fetchAllEvents();
        }}
        viewOnly={viewOnly}
      />

      <div className="event-container">
        <h3>Event Manager</h3>
        <Button variant="contained" onClick={(e) => editEvent(e, null)}>
          Schedule new event
        </Button>
        <div className="event-cards-container">
          {events.map((event) => (
            <EventCard key={event.id} event={event} onClickCard={viewEvent} onClickEdit={editEvent} />
          ))}
        </div>
      </div>
    </>
  );
};

export default EventManagerScreen;
