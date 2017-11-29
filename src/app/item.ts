import { Fighter } from './fighter';

export class Item {

  constructor(
    public itemType: string,
    private itemTypeList:object
  ) { }

  get image(): string {
    let image = this.itemTypeList[this.itemType].image;
    return image;
  }

  get name(): string {
    let name = this.itemTypeList[this.itemType].name;
    return name;
  }

  get value(): number {
    return this.itemTypeList[this.itemType].value;
  }
  get type(): string {
    return this.itemTypeList[this.itemType].type;
  }

  get imageUrl() {
    return '../assets/img/' + this.image;
}

  doJob(team: Array<Fighter>, counterTeam: Array<Fighter>, index: number) {
    let answer: boolean = false;
    let target: Fighter;
    switch (this.itemType) {
      case 'cure':
        target = team[index];
        target.hp += 15;
        if (target.hp > target.maxHp) {
          target.hp = target.maxHp;
        }
        answer = true;
        break;

      case 'totalCure':
        target = team[index];
        target.hp = target.maxHp;
        answer = true;
        break;

      case 'fireBall':
        do {
          let dice:number = Math.floor(Math.random() * counterTeam.length);
          target = counterTeam[dice];
        } while (!target.isAlive);
        target.hp-= Math.floor(Math.random()*20)+5;
        if (target.hp<0) {
          target.hp=0;
          target.image='skull.jpg';
        }
        answer = true;
        break;

      default:
        console.log('item default');
        break;
    }
    return answer;
  }

}
