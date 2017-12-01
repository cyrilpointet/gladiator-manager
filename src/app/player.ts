import { Item } from './item';
import { Fighter } from './fighter';
import { Weapon } from './weapon';
import { Armor } from './armor';


export class Player {
    constructor(
        public name:string,
        public isNoob=true,
        public team: Array<Fighter>,
        public items: Array<Item>,
        public weapons: Array<Weapon>,
        public armors: Array<Armor>,
        public money:number
    ){}
}
