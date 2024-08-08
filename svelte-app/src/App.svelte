<script>
    import { response } from "express";

  let newTask = "";
  let tasks = [];

  async function fetchTasks() {
    const res = await fetch("/api/tasks");
    const data = await response.json();
    tasks = data.tasks;
  }

  async function addTask() {
    if(newTask) {
      const response = awaitfetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: newTask })
      });
      const data = await response.json();
      tasks = [...tasks, { id: data.id, text: newTask, completed: false }];
      newTask = "";
    }
  }

  async function toggleTask(id) {
    await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed }),
    });
    fetchTasks();
  }

  async function removeTask(id) {
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE'
    });
    fetchTasks();
  }
  
  fetchTasks();
</script>

<style>
  @import 'tailwindcss/base';
  @import 'tailwindcss/components';
  @import 'tailwindcss/utilities';
</style>

<main class="container mx-auto mt-8">
  <h1 class="text-4xl font-bold mb-4">予定管理アプリ</h1>

  <div class="flex mb-4">
    <input
      class="border border-gray-300 rounded p-2 w-full"
      bind:value={newTask}
      placeholder="新しいタスクを入力"
    />
    <button
      class="bg-blue-500 text-white rounded p-2 ml-2"
      on:click={addTask}
    >
      追加
    </button>
  </div>

  <ul>
    {#each tasks as task}
      <li class="flex items-center mb-2">
        <input
          type="checkbox"
          class="mr-2"
          checked={task.completed}
          on:change={() => toggleTask(task.id)}
        />
        <span class="{task.completed ? 'line-through' : ''}">
          {task.text}
        </span>
        <button
          class="bg-red-500 text-white rounded p-1 ml-4"
          on:click={() => removeTask(task.id)}
        >
          削除
        </button>
      </li>
    {/each}
  </ul>
</main>
