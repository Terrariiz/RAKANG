<template>
  <div id="app">
    <Navbar
      name="Logo Name"
      :navLinks="[
        {
          name: 'Home',
          link: '/home',
          dropdown: false,
        },

{ name: 'About', link: '/about', dropdown: false },

{
          name: 'Contacts',
          link: '/contact',
          dropdown: true,
          dropdownLinks: [ 
            { name: 'A', link: '/pA', dropdown: false },
            { name: 'B', link: '/pB', dropdown: false },
          ],
        },
        {
          name: 'Projects',
          link: '/projects',
          dropdown: true,
          dropdownLinks: [ 
            { name: 'C', link: '/pA', dropdown: false },
            { name: 'D', link: '/pB', dropdown: false },
          ],
        },
      ]"
    />
  </div>
</template>
<script>
const Navbar = () => import('@/components/navbar/admin_navbar')
export default {
  name: 'App',
  components: {
    Navbar,
  },
}
</script>