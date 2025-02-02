import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

const SuccessComponent = () => {
  return (
    <Card
      component={motion.div}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
      sx={{
        width: "100%",
        height: "100vh",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: 5,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Box
          component={motion.div}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          sx={{ display: "flex", justifyContent: "center", mb: 2 }}
        >
          <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
        </Box>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Success!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          You successfully responded to the event!
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SuccessComponent;
