import Router from "./routes";
import ThemeProvider from "./theme";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 5000,
    },
  },
  queryCache: new QueryCache({
    onError: (err, q) => {
      console.log(err, q, "q");
    },
  }),
  mutationCache: new MutationCache({
    onError: (err, q) => {
      console.log(err, q, "m");
    },
  }),
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
