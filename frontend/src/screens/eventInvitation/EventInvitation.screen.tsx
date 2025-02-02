import { Button, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { format } from "date-fns";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useGraphQL } from "../../contexts/GraphQl.context";
import { Event } from "../../generated/graphql";
import { GraphQlSdk } from "../../graphql/GraphQlClient";
import "./EventInvitation.screen.css";

const initialValues = {
  email: "",
  answer: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Please enter a valid email address").required("Email is required"),
  answer: Yup.string().required("Answer is required"),
});

const EventInvitationScreen = () => {
  const { graphqlRequest } = useGraphQL();
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>();

  const fetchEvent = async () => {
    const data = await graphqlRequest(GraphQlSdk.FindEventById, { id }, false);
    const event = data?.findEventById;
    if (event) {
      event.startDate = format(new Date(event.startDate), "Pp");
      event.endDate = format(new Date(event.endDate), "Pp");
      setEvent(event);
    }
  };

  const fetchEventInvitation = async (email: string) => {
    const data = await graphqlRequest(GraphQlSdk.FindInvitationByEmail, { eventInvitation: { email, event: id } }, false);
    return data?.findOneEventInvitationByEmail;
  };

  const handleSubmit = async (values: any) => {
    const existentInvitation = await fetchEventInvitation(values.email);

    await graphqlRequest(
      GraphQlSdk.CreateOrUpdateEventInvitation,
      { setEventInvitation: { ...values, event: id, id: existentInvitation?.id || null } },
      false,
      "Success"
    );
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Box sx={{ maxWidth: 500, margin: "auto", padding: 2 }}>
          <div className="invitation-info-container">
            <Typography variant="h4">{event?.name}</Typography>
            <Typography>{event?.description}</Typography>
            <div className="invitation-dates-container">
              <Typography>Starts on {event?.startDate} </Typography>
              <Typography>Ends on {event?.endDate} </Typography>
            </div>
          </div>

          <Form>
            <Field
              name="email"
              type="email"
              label="Email"
              fullWidth
              variant="outlined"
              as={TextField}
              helperText={<ErrorMessage name="email" />}
              error={!values.email}
              sx={{ marginBottom: 2 }}
            />

            <Box sx={{ marginBottom: 2 }}>
              <Typography>Answer</Typography>
              <ToggleButtonGroup
                value={values.answer}
                exclusive
                onChange={(_, newValue) => setFieldValue("answer", newValue)}
                fullWidth
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ToggleButton value="YES">Yes</ToggleButton>
                <ToggleButton value="NO">No</ToggleButton>
                <ToggleButton value="MAYBE">Maybe</ToggleButton>
              </ToggleButtonGroup>
              <ErrorMessage name="answer" />
            </Box>

            <Button type="submit" variant="contained" fullWidth>
              Confirm
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default EventInvitationScreen;
