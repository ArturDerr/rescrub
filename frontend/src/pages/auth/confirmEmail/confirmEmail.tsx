import { Header } from "../../../components/main/header";
import { Footer } from "../../../components/main/footer";
import { ConfirmEmailForm } from "../../../components/auth/confirmEmailForm";

export const ConfirmEmail = () => {
    return (
        <div className="flex w-full h-screen">
            <div className="flex flex-col w-full h-full">
                <Header />
                <main className="flex justify-center items-center h-screen">
                    <ConfirmEmailForm />
                </main>
                <Footer title="Перейти на почту"/>
            </div>
        </div>
    )
}