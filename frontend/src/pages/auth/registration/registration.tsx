import { Header } from "../../../components/auth/header";
import { Aside } from "../../../components/auth/aside";
import { RegForm } from "../../../components/auth/regFrom";

export const Registration = () => {
    return (
        <div className="flex w-full h-screen">
            <div className="flex flex-col lg:w-1/2 w-full h-full">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <RegForm />
                </main>
            </div>
            <Aside /> 
        </div>
    )
}