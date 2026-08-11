import { Layouts } from "@crm/interface";
import { Sections } from "./sections";

export function HomePage() {
    return (
        <Layouts.PageLayout>
            <Sections.Hero />
            {/* <Sections.Features />
            <Sections.Contact /> */}
        </Layouts.PageLayout>
    )
}