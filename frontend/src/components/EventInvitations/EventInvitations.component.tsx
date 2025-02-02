import Person from "@mui/icons-material/Person";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGraphQL } from "../../contexts/GraphQl.context";
import { Event, EventInvitation } from "../../generated/graphql";
import { GraphQlSdk } from "../../graphql/GraphQlClient";

interface IEventInvitationsProps {
  event: Event;
}

const EventInvitations = ({ event }: IEventInvitationsProps) => {
  const [eventInvitations, setEventInvitations] = useState<EventInvitation[]>();
  const { graphqlRequest } = useGraphQL();

  const fetchEventInvitations = async () => {
    const data = await graphqlRequest(GraphQlSdk.FindEventInvitationsByEvent, { eventInvitation: { event: event.id } }, true);
    if (data) setEventInvitations(data.findEventInvitationsByEvent);
  };

  useEffect(() => {
    if (event) {
      fetchEventInvitations();
    }
  }, [event]);

  return (
    <>
      {!!eventInvitations?.length && (
        <div>
          <List sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper", overflow: "auto", maxHeight: 500 }}>
            <Typography variant="h6" style={{ textAlign: "center" }}>
              Invitation answers
            </Typography>
            {eventInvitations?.map((eventInvitation) => (
              <ListItem key={eventInvitation.id}>
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={eventInvitation.email} secondary={eventInvitation.answer} />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </>
  );
};

export default EventInvitations;
