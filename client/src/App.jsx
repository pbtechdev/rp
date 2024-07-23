import Router from "./routes";
import ThemeProvider from "./theme";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

const onError = (err) => {
  const { data, status } = err?.response ?? {};
  if (status === 400) {
    toast.error(data?.message);
    return;
  }
  toast.error("Something went worng");
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      keepPreviousData: true,
      staleTime: 5000,
    },
  },
  queryCache: new QueryCache({ onError }),
  mutationCache: new MutationCache({ onError }),
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router />
        <Toaster position="bottom-right" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
