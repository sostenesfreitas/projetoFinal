<template>
  <div class="cont">
  <!-- Message received from peer -->
  {{ $route.params.imgUrl }}
  <div class="chat-other">
    <div class="chat-user">
      <img src="https://scontent.frec3-1.fna.fbcdn.net/v/t1.0-9/14925543_10154527491605731_5198909176989896366_n.jpg?oh=87aab5786c28da30c9aaf85b82a151de&oe=594E3338">
    </div>
    <div class="chat-date">
      7 minutes ago
    </div>
    <div class="chat-message">
      <p>
        Estou com problemas
      </p>
    </div>
  </div>
  <!-- Message sent by you -->
  <div class="chat-you">
    <div class="chat-user">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Dr._Robert_Rey.jpg/200px-Dr._Robert_Rey.jpg" class="foto avatar">
    </div>
    <div class="chat-date">
      4 minutes ago
    </div>
    <div class="chat-message">
      <p>
        qual o problem
      </p>
    </div>
  </div>
</div>
</template>

<script>
export default {
}
</script>

<style>
.cont {
  width: 100%
}
</style>
