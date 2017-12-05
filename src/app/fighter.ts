/**************************************************************************/
/* fighter class:                                                         */
/*    constructor:                                                        */
/*        archetype:object = object containig all of the character's      */
/*                           attibutes.                                   */
/*                           the object is a attibute of the object       */
/*                           fighterTypeList defined in game.service.ts   */
/*                           from ./assets/fighterType.json               */
/*        weaponTypeList:object = list of weapons available on the game   */
/*                               defined in game.service.ts from          */
/*                                ./assets/weaponType.json                */
/*        armorTypeList:object = list of armors available on the game     */
/*                               defined in game.service.ts from          */
/*                                ./assets/armorType.json                 */
/*                                                                        */
/*  attribute:                                                            */
/*    name:string = name of the fighter                                   */
/*    race:string = race of the fighter                                   */
/*    hp:number = health points                                           */
/*    image:string = name of the file used for illustration               */
/*    attack:number = attack bonus                                        */
/*    defense:number = defense bonus                                      */
/*    weapon:object = the weapon worn by the fighter                      */
/*    armor:object = the armor worn by the fighter                        */
/*    maxHp:number = maximum of health points                             */
/*    xp:number = experience points. is added to value                    */
/*                                                                        */
/*  getter                                                                */
/*    isAlive:boolean = return true if the fighter is still alive         */
/*    armorClass:number = calculate the armor class of the fighter        */
/*    imageUrl:string = return the relative path of the image file        */
/*                                                                        */
/*  methods                                                               */
/*      stuffMeWeapon: generate a random weapon from the string array     */
/*                  archetype.weaponList                                  */
/*      stuffMeArmor: generate a random armor from the string array       */
/*                  archetype.armorList                                   */
/*      takeDamage(damage: number): remove the amount of 'damage' from hp */
/**************************************************************************/



import { Weapon } from './weapon';
import { Armor } from './armor';

export class Fighter {
    constructor(
        public archetype,
        public weaponTypeList,
        public armorTypeList
    ) { }

    name: string = this.archetype.name;
    race: string = this.archetype.race;
    hp: number = this.archetype.hp;
    image: string = this.archetype.image;
    attack: number = this.archetype.attack;
    defense: number = this.archetype.defense;
    weapon: Weapon = this.stuffMeWeapon(this.archetype.weaponList);
    armor: Armor = this.stuffMeArmor(this.archetype.armorList);
    maxHp: number = this.hp;
    xp: number=0;
    victory: number=0;
    inArena: boolean=false;

    // variables for animating
    animState:string='inactive';
    classType: string = 'fadeInDownBig';
    couleurfond: string = 'white';

    get isAlive() {
        if (this.hp > 0) {
            return true;
        } else {
            return false;
        }
    }

    get armorClass() {
        return 50 + this.defense + this.armor.acBonus;
    }

    get imageUrl() {
        return '../assets/img/' + this.image;
    }

    get value() {
        let value:number = (this.hp*2) + (this.maxHp*2) + this.attack + this.defense+ this.weapon.value + this.armor.value + this.xp;
        return value
    }

    get hpOnMaxHp() {
        return `${(this.hp / this.maxHp) * 100}%`;
      }
    
      get hpGaugeColor() {
        let hue = `${(this.hp / this.maxHp) * 120}`
        return `hsl(${hue},100%,40%)`;
      }

    stuffMeWeapon(stuffList: Array<string>) {
        let dice = stuffList.length;
        let result = Math.floor(Math.random() * dice);
        return new Weapon(stuffList[result], this.weaponTypeList);
    }

    stuffMeArmor(stuffList: Array<string>) {
        let dice = stuffList.length;
        let result = Math.floor(Math.random() * dice);
        return new Armor(stuffList[result], this.armorTypeList);
    }


    takeDamage(damage: number) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.hp = 0;
            this.image = 'skull.jpg'
        }
    }
}
