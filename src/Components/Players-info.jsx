import { useState } from "react"

export default function Player({initialName, symbol, isActive, onChange}){

  const [playerName, setPlayerName] = useState(initialName);
  const[didEdit, doEdit] = useState(false);

  function handleEdit(){
    doEdit((editing) => !editing);

    if(didEdit){
      onChange(symbol, playerName);
    }
  }

  function handleChange(event){
    setPlayerName(event.target.value);
  }

  let editPlayerName = <span className="player-name">{playerName}</span>;
  //let btnCaption = 'Edit';

  if(didEdit){
    editPlayerName = <input type="text" required value={playerName} onChange={handleChange}/> ;
    //btnCaption = 'Save';
  }

    return(
        <li className={isActive ? 'active':undefined}>
            <span className="player">
                {editPlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{didEdit ? 'Save':'Edit'}</button>
          </li>
    );
}