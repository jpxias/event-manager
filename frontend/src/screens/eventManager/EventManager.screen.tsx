import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import CreateEventModal from "../../components/CreateEventModal/CreateEventModal.component";
import EventCard from "../../components/EventCard/EventCard.component";
import TopBar from "../../components/TopBar/TopBar";
import { useAuthContext } from "../../contexts/Auth.context";
import { useGraphQL } from "../../contexts/GraphQl.context";
import { Event } from "../../generated/graphql";
import { GraphQlSdk } from "../../graphql/GraphQlClient";
import "./EventManager.css";

const EventManagerScreen = () => {
  const { token } = useAuthContext();
  const [events, setEvents] = useState<Event[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [viewOnly, setViewOnly] = useState<boolean>(false);
  const { graphqlRequest } = useGraphQL();

  const fetchAllEvents = async () => {
    const data = await graphqlRequest(GraphQlSdk.FindAllEvents, { filter: {} }, true);
    if (data) setEvents(data.findAllEvents);
  };

  const onClickDelete = async (event: Event) => {
    await graphqlRequest(GraphQlSdk.RemoveEvent, { id: event.id }, true, "The event has been deleted");
    fetchAllEvents();
  };

  useEffect(() => {
    fetchAllEvents();
  }, [token]);

  const editEvent = (event: Event | null) => {
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
        <TopBar />
        <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={() => editEvent(null)} style={{ margin: 20 }}>
            New event
          </Button>
        </div>

        <div className="event-cards-container">
          {events.map((event) => (
            <EventCard key={event.id} event={event} onClickDelete={onClickDelete} onClickCard={viewEvent} onClickEdit={editEvent} />
          ))}
        </div>
      </div>
    </>
  );
};

export default EventManagerScreen;
