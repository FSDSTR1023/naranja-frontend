/* eslint-disable react/prop-types */


const GroupCard = ({ group }) => {
   
    return (
        <div className="">
            <p className="font-bold text-sm">{group?.name}</p>
            <p className="font-bold text-sm">{group?.description}</p>
            <p className="font-bold text-sm">Fecha último mensaje </p>
        </div>
    )
}

export default GroupCard;