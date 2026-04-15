import type { PlayerDTO, StateDTO } from "./models/player.mts";
import { Player } from "./Player.mts";

export class State {
    Players : Player[] = [] 
    
    load(state : StateDTO) {
        
        for (let PlayerDTO of state.Players){
            const player = this.Players.find((e) => e.connectionId == PlayerDTO.playerConnectionId)
            if (!player){
                this.Players.push(new Player(PlayerDTO.playerConnectionId))
            }
            else{
                player.load(PlayerDTO)
            }
        }
        
    }
}