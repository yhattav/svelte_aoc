<script>
export let board;

</script>




<div class="board">
	{#each board as row,index}
		<div class ="row row-{index}">

                {row ? row : ' '}

        </div>
	{/each}
</div>


<style>
    .board {
        font-size: 20px;
        width: 400px;
        height: auto;
        overflow-x: scroll;
        overflow-y: scroll;
        /* float: inline-end; */
    }

    .tile{
        border:1px;
        border-color: black;
        width:15px;
        height:15px;
        float: left;
    }
    .tile-\#{
        background-color: rgb(221, 217, 217);
    }
    .tile-\.{
        background-color: burlywood;
    }
    .tile-{
        background-color: black;
    }
    .tile-3{
        background-color: greenyellow;
    }
</style>