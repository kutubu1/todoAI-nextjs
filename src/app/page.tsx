
import Image from "next/image";
import Header from "./components/Header";
import { TodoList } from "./components/TodoList";
import "@copilotkit/react-ui/styles.css";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";

export default function Home() {
  return (
    <>
      <Header />
      <div className="border rounded-md max-w-2xl mx-auto p-4 mt-4">
        <h1 className="text-2xl text-white font-bold mb-4">
          Create a to-do list
        </h1>
        <CopilotKit runtimeUrl="/api/copilotkit">
        <TodoList />
        <CopilotPopup
          instructions={
            "Help the user manage the todo list. If user provides a high level goal, break it down into a few specific tasks and add them to the list."
          }
          defaultOpen={true}
          labels={{
            title: "Todo List Copilot",
            initial: "Hi you! I can help you manage your todo list.",
          }}
          clickOutsideToClose={false}
        />
        </CopilotKit>
      </div>
    </>
  );
}