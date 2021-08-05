function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let currentRound;
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logs: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    useSpecialAttack() {
      if (this.currentRound === 0) {
        return true;
      } else {
        return this.currentRound % 3 !== 0;
      }
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.currentRound = 0;
      this.logs = [];
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addBattleLog("player", "atacks by", attackValue);
      this.attackPlayer();
      console.log(this.monsterHealth);
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.addBattleLog("monster", "atacks by", attackValue);
      this.playerHealth -= attackValue;
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addBattleLog("player", "atacks by", attackValue);
      this.attackPlayer();
      console.log("current round: " + this.currentRound);
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addBattleLog("player", "heals by", healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    addBattleLog(who, what, value) {
      this.logs.unshift({
        by: who,
        type: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
