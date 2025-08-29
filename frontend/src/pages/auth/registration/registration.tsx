import { Header } from "../../../components/main/header";
import { RegForm } from "../../../components/auth/regFrom";
import { Footer } from "../../../components/main/footer";

export const Registration = () => {
    return (
        <div className="flex w-full h-screen">
            <div className="flex flex-col w-full h-full">
                <Header />
                <main className="flex items-center justify-center">
                    <RegForm />
                </main>
            </div>
        </div>
    )
}