/**************************************************************************/
/* Armor class:                                                           */
/*    constructor:                                                        */
/*        type:string = name of the armor                                 */
/*        armorTypeList:object = list of armors available on the game     */
/*                               defined in game.servie.ts from           */
/*                                ./assets/armorType.json                 */
/*                                                                        */
/*  attribute:                                                            */
/*    name:string = name of the armor                                     */
/*    acBonus:number = armor bonus for the owner                          */
/*    image:string = name of the file used for illustration               */
/*    value:number = price of the armor                                   */
/*  getter                                                                */
/*    imageUrl:string = return the relative path of the image file        */
/**************************************************************************/


export class Armor {
    constructor(
        public type:string,
        private armorTypeList:object
        
      ) { }

      name:string= this.armorTypeList[this.type].name;
      acBonus:number= this.armorTypeList[this.type].acBonus;
      image:string= this.armorTypeList[this.type].image;
      value:number= this.armorTypeList[this.type].value;
      market:boolean= this.armorTypeList[this.type].market;

      get imageUrl() {
        return '../assets/img/' + this.image;
      }
}
