/**************************************************************************/
/* Weapon class:                                                          */
/*    constructor:                                                        */
/*        type:string = name of the weapon                                */
/*        weaponTypeList:object = list of weapons available on the game   */
/*                               defined in game.servie.ts from           */
/*                                ./assets/weaponType.json                */
/*                                                                        */
/*  attribute:                                                            */
/*    name:string = name of the weapon                                    */
/*    minDamage:number = minimum damage of the weapon                     */
/*    maxDamage:number = maximum damage of the weapon                     */
/*    image:string = name of the file used for illustration               */
/*  getter                                                                */
/*    value:number = price of the weapon                                  */
/*    imageUrl:string = return the relative path of the image file        */
/**************************************************************************/

export class Weapon {

  constructor(
    public type: string,
    private weaponTypeList: object
  ) { }

  name: string = this.weaponTypeList[this.type].name;
  minDamage: number = this.weaponTypeList[this.type].minDamage;
  maxDamage: number = this.weaponTypeList[this.type].maxDamage;
  image: string = this.weaponTypeList[this.type].image;
  market: boolean = this.weaponTypeList[this.type].market;

  get value() {
    let value:number;
    if (this.type=='unArmed') {
      value=0;
    } else {
      value = this.minDamage + this.maxDamage;
    }
    return value
  }
  get imageUrl() {
    return '../assets/img/' + this.image;
  }
}
