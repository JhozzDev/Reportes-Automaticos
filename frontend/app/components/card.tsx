export default function Card({ info }: { info: string }){
    return (
        <div className="bg-[#3C3489] rounded-lg px-3 py-2 text-[#EEEDFE] hover:bg-[#7F77DD] cursor-pointer">
            <h1>{info}</h1>
        </div>
    )
}