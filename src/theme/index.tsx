import { MantineTheme } from "@mantine/core";

const theme: Partial<MantineTheme> = {
  components: {
    Button: {
      styles(theme, params) {
        return {
          root: {
            inner: {
              background: "#5b73e8",
              "&:hover": {
                background: "#5b73e8",
                opacity: 0.9,
              },
            },
          },
        };
      },
    },
  },
};

export default theme;
