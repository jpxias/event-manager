import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, Button, FormControlLabel, IconButton, InputAdornment, Modal, Switch, TextField } from "@mui/material";
import { format } from "date-fns";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { useGraphQL } from "../../contexts/GraphQl.context";
import { Event } from "../../generated/graphql";
import { GraphQlSdk } from "../../graphql/GraphQlClient";
import EventInvitations from "../EventInvitations/EventInvitations.component";
import "./CreateEventModal.component.css";
import { eventInitialValues, eventValidationSchema } from "./CreateEventModal.schema";

interface ICreateEventModalProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (event: Event) => void;
  event: Event | null;
  viewOnly: boolean;
}

const CreateEventModal = ({ open, handleClose, event, handleSubmit, viewOnly }: ICreateEventModalProps) => {
  const { graphqlRequest } = useGraphQL();

  const changeEventFreeze = async (e: any) => {
    if (event) {
      const data = await graphqlRequest(GraphQlSdk.CreateOrUpdateEvent, { input: { ...event, freezed: e.target.checked } }, true);
      if (data) {
        formik.setFieldValue("freezed", data.createOrUpdateEvent.freezed);
      }
    }
  };

  const formik = useFormik({
    initialValues: eventInitialValues,
    validationSchema: eventValidationSchema,
    onSubmit: async (values) => {
      const data = await graphqlRequest(GraphQlSdk.CreateOrUpdateEvent, { input: values }, true, "Your changes have been saved");
      if (data) handleSubmit(data.createOrUpdateEvent);
    },
  });

  const formatDate = (date: string): string => {
    return format(new Date(date), "yyyy-MM-dd'T'HH:mm");
  };

  const defaultSlotProps = {
    htmlInput: {
      readOnly: viewOnly,
    },
  };

  useEffect(() => {
    formik.resetForm();

    if (event) {
      event = event as Event;

      formik.setValues({
        id: event.id,
        name: event.name,
        description: event.description ?? "",
        startDate: formatDate(event.startDate),
        endDate: formatDate(event.endDate),
        freezed: event.freezed || false,
      });
    } else {
      formik.setValues(eventInitialValues);
    }
  }, [event]);

  const shareableLink = `http://localhost:5173/invitation/${event?.id}`;

  const handleCopyClick = () => {
    navigator.clipboard.writeText(shareableLink).then(() => {
      enqueueSnackbar("Link copied to clipboard");
    });
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="Create new event">
      <Box
        component="form"
        style={{ backgroundColor: "white" }}
        onSubmit={formik.handleSubmit}
        className="create-event-modal"
        sx={{
          p: 4,
        }}
      >
        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close" className="close-modal-icon">
          <CloseIcon />
        </IconButton>
        <div className="create-event-form-container">
          <div className="create-event-form">
            <TextField
              label="Event Name"
              name="name"
              value={formik.values.name}
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
              slotProps={defaultSlotProps}
            />
            <TextField
              label="Description"
              name="description"
              multiline
              rows={3}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              fullWidth
              slotProps={defaultSlotProps}
            />
            <TextField
              label="Start Date"
              name="startDate"
              type="datetime-local"
              value={formik.values.startDate}
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.startDate && Boolean(formik.errors.startDate)}
              helperText={formik.touched.startDate && formik.errors.startDate}
              fullWidth
              slotProps={{ ...defaultSlotProps, inputLabel: { shrink: true } }}
            />
            <TextField
              label="End Date"
              name="endDate"
              type="datetime-local"
              value={formik.values.endDate}
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.endDate && Boolean(formik.errors.endDate)}
              helperText={formik.touched && formik.errors.endDate}
              fullWidth
              slotProps={{ ...defaultSlotProps, inputLabel: { shrink: true } }}
            />
            {viewOnly && (
              <>
                <TextField
                  label="Shareable link"
                  variant="outlined"
                  fullWidth
                  value={shareableLink}
                  slotProps={{
                    input: {
                      ...defaultSlotProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleCopyClick} color="primary">
                            <ContentCopyIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <FormControlLabel
                  control={<Switch name="freezed" checked={formik.values.freezed} onChange={changeEventFreeze} />}
                  label="Freeze Event"
                />
              </>
            )}

            {!viewOnly && (
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            )}
          </div>
          {viewOnly && <EventInvitations event={event as Event} />}
        </div>
      </Box>
    </Modal>
  );
};

export default CreateEventModal;
