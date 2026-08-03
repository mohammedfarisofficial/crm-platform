import { PageLayoutProps } from './index.types'

export function PageLayout({ children }: PageLayoutProps) {
    return (
        <div>
            page layout text
            {children}
        </div>
    )
}