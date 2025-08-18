import { Alert, AlertDescription, AlertTitle } from "./alert";

interface IButtonProps {
    title: string
    description: string | null
}

export const AlertError = ({ title, description }: IButtonProps) => {
    return (
        <Alert variant="destructive">
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                <p>{description}</p>
            </AlertDescription>
        </Alert>
    
    )
}