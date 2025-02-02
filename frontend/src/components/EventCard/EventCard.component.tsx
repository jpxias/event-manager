import Edit from "@mui/icons-material/Edit";
import { Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import { Event } from "../../generated/graphql";
import "./EventCard.component.css";

interface IEventCardProps {
  event: Event;
  onClickCard: (event: Event) => void;
  onClickEdit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, event: Event) => void;
}

const EventCard = ({ event, onClickCard, onClickEdit }: IEventCardProps) => {
  const startDate = `${new Date(event.startDate).toLocaleDateString()} ${new Date(event.startDate).toLocaleTimeString()}`;
  const endDate = `${new Date(event.endDate).toLocaleDateString()} ${new Date(event.endDate).toLocaleTimeString()}`;

  return (
    <Card className="event-card" onClick={() => onClickCard(event)}>
      <CardHeader
        action={
          <>
            <IconButton
              aria-label="edit"
              onClick={(e) => {
                onClickEdit(e, event);
              }}
            >
              <Edit />
            </IconButton>
          </>
        }
        title={event.name}
        subheader={event.description}
      />
      <CardContent>
        <Typography variant="body2">Start: {startDate}</Typography>
        <Typography variant="body2">End: {endDate}</Typography>
      </CardContent>
    </Card>
  );
};

export default EventCard;
