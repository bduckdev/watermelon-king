<script>
    import Modal from "./Modal.svelte";
</script>

<Modal buttonText="Login/Sign Up" modalHeading="Login">
    <div class="grid grid-flow-row-dense overflow-y-scroll h-[calc(50vh)] grid-cols-1 gap-5 justify-center">
        <button on:click={()=>
            (window.location.href = "http://localhost:3001/auth/google")}
            class="btn
            btn-primary"
            >
            <i class="devicon-google-plain"></i>

            Login With Google</button>
        <button on:click={()=>
            (window.location.href = "http://localhost:3001/auth/github")}
            class="btn
            btn-primary"
            >
            <i class="devicon-github-original"></i>

            Login With Github</button>
    </div>
</Modal>
