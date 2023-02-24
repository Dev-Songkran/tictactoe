import { createStyles } from "@mantine/core";

const useStyles = createStyles(theme => ({
  buttonPrimary: {
    background: "#526ad9",
    "&:hover": {
      background: "#526ad9",
      opacity: 0.9
    }
  },
  textPrimary: {
    color: "#526ad9"
  }
}))

export default useStyles