import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LineupProvider } from "../lineup";
import Schedule from "./Schedule";

const queryClient = new QueryClient();

export default function ScheduleWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <LineupProvider>
        <Schedule />
      </LineupProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}
