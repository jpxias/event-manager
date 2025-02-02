import Person from "@mui/icons-material/Person";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/Auth.context";
import { useGraphQL } from "../../contexts/GraphQl.context";
import { Event, EventInvitation } from "../../generated/graphql";
import { GraphQlSdk } from "../../graphql/GraphQlClient";

interface IEventInvitationsProps {
  event: Event;
}

const EventInvitations = ({ event }: IEventInvitationsProps) => {
  const { token } = useAuthContext();
  const [eventInvitations, setEventInvitations] = useState<EventInvitation[]>();
  const { FindEventInvitationsByEvent } = GraphQlSdk;
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
    <div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {eventInvitations?.map((eventInvitation) => (
          <ListItem>
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
  );
};

export default EventInvitations;
