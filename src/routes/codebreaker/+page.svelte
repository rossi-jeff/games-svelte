<script lang="ts">
	import type { CodeBreaker } from "../../graphql/types/code-breaker";
    import { graphQlClient } from '../../lib'
	import { CODE_BREAKER_CREATE } from "../../graphql/mutations/code-breaker-create";
	import OptionsForm from "./OptionsForm.svelte";
	import GuessForm from "./GuessForm.svelte";
	import { CODE_BREAKER_GUESS } from "../../graphql/mutations/code-breaker-guess";
	import type { CodeBreakerGuess } from "../../graphql/types/code-breaker-guess";
	import { CODE_BREAKER } from "../../graphql/queries/code-breaker";
	import GuessList from "./GuessList.svelte";

    let game: CodeBreaker = {}
    let guess: CodeBreakerGuess = {}
    let availableColors: string[] = []
    let availableColumns: number

    const createGame = (event: any) => {
        const { colors, columns, selected} = event.detail

        availableColors = selected
        availableColumns = columns

        graphQlClient.request(CODE_BREAKER_CREATE,{ 
                colors, 
                columns 
            })
            .then(result => {
                game = result.codeBreakerCreate
            })
            .catch((e) => console.error(e));
    }

    const createGuess = (event: any) => {
        const { colors } = event.detail
        const id = game.Id
        graphQlClient.request(CODE_BREAKER_GUESS,{ id, colors})
            .then(result => {
                guess = result.codeBreakerGuess
                if (!game.Guesses) game.Guesses = []
                game.Guesses.push(guess)
                reloadGame()
            })
            .catch((e) => console.error(e));
    }

    const reloadGame = () => {
        graphQlClient.request(CODE_BREAKER,{ id: game.Id })
            .then(result => {
                game = result.codeBreaker
            })
            .catch((e) => console.error(e));
    }
</script>

{#if game && game.Guesses}
    <GuessList guesses={game.Guesses} />
{/if}

{#if game && game.Status === 'Playing'}
    <GuessForm {availableColors} {availableColumns} on:sendGuess={createGuess} />
{:else}
    <OptionsForm on:sendOptions={createGame} />
{/if}

<div>{game.Status}</div>
