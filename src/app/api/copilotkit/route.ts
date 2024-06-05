import{CopilotRuntime, OpenAIAdapter} from '@copilotkit/backend';


export async function POST(req: Request): Promise<Response> {
    const copilotkit = new CopilotRuntime({});

    return copilotkit.response(req, new OpenAIAdapter());
}