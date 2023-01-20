<script lang="ts">
	import type { YachtTurn } from "../../graphql/types/yacht-turn";
	import type { Yacht } from "../../graphql/types/yacht";
	import { graphQlClient } from "$lib";
	import { YACHT_CREATE } from "../../graphql/mutations/yacht-create";
    import { onMount } from 'svelte'
	import type { YachtScoreOption } from "../../graphql/types/yacht-score-option";
	import { YACHT_ROLL } from "../../graphql/mutations/yacht-roll";
	import RollOne from "./RollOne.svelte";
	import RollTwo from "./RollTwo.svelte";
	import RollThree from "./RollThree.svelte";
	import OptionList from "./OptionList.svelte";
	import { YACHT_SCORE_TURN } from "../../graphql/mutations/yacht-score-turn";
	import { YACHT } from "../../graphql/queries/yacht";
	import ScoreCard from "./ScoreCard.svelte";


    let game: Yacht = {}
    let turn: YachtTurn = {}
    let options: YachtScoreOption[] = []

    const createGame = () => {
        graphQlClient.request(YACHT_CREATE,{})
            .then(result => {
                game = result.yachtCreate
            })
            .catch((e) => console.error(e));
    }

    const rollDice = (Keep: number[] = []) => {
        graphQlClient.request(YACHT_ROLL,{ id: game.Id, roll: { Keep } })
            .then(result => {
                const { Turn, Options } = result.yachtRoll
                turn = Turn
                options = Options
            })
            .catch((e) => console.error(e));
    }

    const firstRoll = () => {
        if (turn && turn.RollOne) return
        rollDice()
    }

    const secondRoll = (event: any) => {
        if (turn && turn.RollTwo) return
        const { Keep } = event.detail
        rollDice(Keep)
    }

    const thirdRoll = (event: any) => {
        if (turn && turn.RollThree) return
        const { Keep } = event.detail
        rollDice(Keep)
    }

    const scoreTurn = (event: any) => {
        const { Category } = event.detail
        let Dice: number[] = []
        if (turn.RollThree) {
            Dice = turn.RollThree
        } else if (turn.RollTwo) {
            Dice = turn.RollTwo
        } else if (turn.RollOne) {
            Dice = turn.RollOne
        }
        graphQlClient.request(YACHT_SCORE_TURN, { 
                id: turn.Id, 
                score: { Category, Dice } 
            })
            .then(result => {
                console.log(result);
                turn = {}
                options = []
                reloadGame()
            })
            .catch((e) => console.error(e));
    }

    const reloadGame = () => {
        graphQlClient.request(YACHT,{ id: game.Id })
            .then(result => {
                game = result.yacht
                console.log(game);
            })
            .catch((e) => console.error(e));
    }

    onMount(() => {
        createGame()
    })
</script>

{#if turn && (!turn.RollOne && (!game.Turns || (game.Turns && game.Turns.length < 12)))}
    <button on:click={firstRoll}>First Roll</button>
{/if}

{#if turn && turn.RollOne}
    <RollOne {turn} on:roll={secondRoll} />    
{/if}

{#if turn && turn.RollTwo}
    <RollTwo {turn} on:roll={thirdRoll} />
{/if}

{#if turn && turn.RollThree}
    <RollThree {turn} />
{/if}

{#if options && options.length > 0}
    <OptionList {options} on:score={scoreTurn} />    
{/if}

{#if game && game.Turns && game.Turns.length > 0}
    <ScoreCard {game} />
{/if}

<div>
    <button on:click={createGame}>New Game</button>
</div>