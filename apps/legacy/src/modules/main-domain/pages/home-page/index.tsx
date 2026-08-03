import { Layouts } from "@crm/interface";
import { FeaturesSection, HeroSection } from "./sections";

export function HomePage() {
    return (
        <Layouts.PageLayout>
            <HeroSection />
            <FeaturesSection />
        </Layouts.PageLayout>
    )
}