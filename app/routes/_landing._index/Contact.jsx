import ContactForm from "../../components/ContactForm"

export default function Contact() {
   return (
      <>
         <div className="flex w-full flex-wrap items-center justify-start">
            <div className="w-full sm:w-1/2">
               <ContactForm />
            </div>
            <div className="w-full sm:w-1/2">
               <div className=" mx-auto  w-full max-w-md  rounded-2xl bg-gray-50 p-4 shadow-input dark:bg-gray-50 md:p-8 ">
                  <iframe src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2tDmYFJHp87eqqZxS9JadpoFTKDDcUGojfSDB_-bIR5X9lN2UFc-ct4P6rDTF-JVOR3vWR5zs9?gv=true" width="100%" height="600" title="Meet with Me"></iframe>
               </div>
            </div>
         </div>
      </>
   )
}
