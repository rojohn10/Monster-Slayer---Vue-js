new Vue({
    el: "#app",
    data: {
            playerHealth: 100,
            goblinsHealth: 100,
            gameOver: null,
            gameIsRunning: false,
            playerDefend: false,
            playerHardAttack: false,
            playerAttack: false,
            playerDamage: null,
            goblinDamage: null,
            isGoblin: false,
            goblinMoves: [
                'goblinattack',
                'goblinhardattack',
                'goblindefend'
            ],
            selectedAttack: '',
            turns: []       
    },

    methods: {
        startGame: function () {
            this.gameIsRunning = true,
                this.playerHealth = 100,
                this.goblinsHealth = 100,
                this.gameOver = null
            this.turns = [];
        },
        attack: function () {
            this.goblinRandomMove();
            this.playerDefend = false;
            this.playerAttack = true;
            this.playerHardAttack = false;
            this.playerDamage = 10;

            if (this.selectedAttack === "goblindefend") {
                this.playerDamage = this.playerDamage / 2;
                this.goblinsHealth -= this.playerDamage;
                this.turns.unshift({
                    isPlayer: false,
                    text: 'Goblin defends for incoming attack'
                });

                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player attack Goblin for ' + this.playerDamage
                });

            } else {
                this.goblinsHealth -= this.playerDamage;
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player attack Goblin for ' + this.playerDamage
                });

                this.goblinAttacks();
            }
        },

        hardAttack: function () {
            this.goblinRandomMove();
            this.playerDefend = false
            this.playerHardAttack = true
            this.playerAttack = false;
            this.playerDamage = 20;

            if (this.selectedAttack === "goblindefend") {
                this.goblinDamage = 20;
                this.playerHealth -= this.goblinDamage;
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player attack missed'
                });

                this.turns.unshift({
                    isPlayer: false,
                    text: 'Goblin evades player hard attack and counters with hard attack for ' + this.goblinDamage
                });

            } else {
                this.goblinsHealth -= this.playerDamage;
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player attack Goblin hard for ' + this.playerDamage
                });


                this.goblinAttacks();
            }
        },

        defend: function () {
            this.goblinRandomMove();
            this.playerDefend = true;
            this.playerAttack = false;
            this.playerHardAttack = false;
            this.goblinAttacks();
        },

        goblinRandomMove: function () {
            this.selectedAttack = this.randomMoves(this.goblinMoves)
        },

        goblinAttacks: function () {
            if (this.selectedAttack === 'goblinattack') {
                this.goblinDamage = 10;
                if (this.playerDefend === true) {
                    this.goblinDamage = this.goblinDamage / 2;
                    this.playerHealth -= this.goblinDamage;
                    this.turns.unshift({
                        isPlayer: true,
                        text: 'Player defends for incoming attack'
                    });
                } else {
                    this.playerHealth -= this.goblinDamage;
                }

                this.turns.unshift({
                    isPlayer: false,
                    text: 'Goblin attack Player for ' + this.goblinDamage
                });

            } else if (this.selectedAttack === 'goblinhardattack') {
                if (this.playerDefend === true) {
                    this.playerDamage = 20;
                    this.goblinsHealth -= this.playerDamage;
                    this.turns.unshift({
                        isPlayer: false,
                        text: 'Goblin attack missed'
                    });
                    this.turns.unshift({
                        isPlayer: true,
                        text: 'Player evades Goblin hard attack and counters with hard attack for ' + this.playerDamage
                    });

                } else {
                    this.goblinDamage = 20;
                    this.playerHealth -= this.goblinDamage;
                    this.turns.unshift({
                        isPlayer: false,
                        text: 'Goblin attack Player hard for ' + this.goblinDamage
                    });
                }
  
            } else {
                if (this.playerDefend === true) {
                    this.turns.unshift({
                        isPlayer: true,
                        text: 'Player defends for incoming attack'
                    });
                    this.turns.unshift({
                        isPlayer: false,
                        text: 'Goblin defends for incoming attack'
                    });
                }
            }
        },

        randomMoves(moves) {
            return moves[Math.floor(Math.random() * moves.length)];
        },
    },
    computed: {
        playerHealthBar: function () {
            var inlineStyles = {
                width: this.playerHealth + '%',
                height: 40
            }
            if (this.playerHealth < 15) {
                inlineStyles.backgroundColor = 'red';
            } else if (this.playerHealth < 30) {
                inlineStyles.backgroundColor = 'gold';
            } else {
                inlineStyles.backgroundColor = 'green';
            }

            return inlineStyles;
        },
        goblinHealthBar: function () {
            var inlineStyles = {
                width: this.goblinsHealth + '%',
                height: 40
            }

            if (this.goblinsHealth < 15) {
                inlineStyles.backgroundColor = 'red';
            } else if (this.goblinsHealth < 30) {
                inlineStyles.backgroundColor = 'gold';
            } else {
                inlineStyles.backgroundColor = 'green';
            }

            return inlineStyles;
        }
    },
    watch: {
        goblinsHealth: function (val) {
            if (val <= 0) {
                this.gameIsRunning = false;
                this.gameOver = 'CONGRATULATIONS, YOU ARE VICTORIOUS!'
            }
        },
        playerHealth: function (val) {
            if (val <= 0) {
                this.gameIsRunning = false;
                this.gameOver = 'YOU LOSE!'
            }
        }
    }
})