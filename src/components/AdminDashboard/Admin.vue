<template>
  <div class="wrapper">

    <nav id="sidebar">
      <div class="sidebar-header">
        <h6>Admin dashboard</h6> 
      </div>
       <div class="image-container">
          <b-img rounded="circle" :src="admin.avatar" id="avatar" style="width: 125px; height: 125px" class="img-thumbnail"/>
        </div> 
       <ul class="list-unstyled components">
            <li>
                <a @click="renderAdminUserComponent"><i class="fas fa-users"></i> Users</a>
            </li>
            <li>
                <a @click="renderAdminDepartmentComponent"><i class="fas fa-building"></i> Departments</a>
            </li>
            <li>
                <a @click="renderCoffeeComponent"><i class="fas fa-coffee"></i> Drinks</a>
            </li>
             <li>
                <a @click="renderCanvasComponent"><i class="fas fa-edit"></i> Canvas</a>
            </li>
        </ul>
    </nav>

    <div id="content">
          <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">

            <button type="button" id="sidebarCollapse" class="btn btn-info" @click="hideSidebar">
                <i class="fas fa-align-left"></i>
                <span>Sidebar</span>
            </button>

        </div>
    </nav>

    <!--this router view will render the child components of the admin dashboard-->
    <router-view></router-view>

    </div>
  </div>
</template> 

<script>

export default {
  name: "Admin",
  components: {

  },

  data() {
    return {
      admin: {}
    }
  },

  methods : {
    hideSidebar(){
      document.getElementById('sidebar').classList.toggle('active');
    },

    renderAdminUserComponent() {
        this.$router.push("/users");
    },

    renderAdminDepartmentComponent () {
        this.$router.push('/departments')
    },

    renderCoffeeComponent () {
        this.$router.push('/coffee')
    },
    renderCanvasComponent () {
    this.$router.push('/canvas/edit')
    } 
  },

  beforeMount() {
   this.admin = JSON.parse(localStorage.getItem("user"));
  }
};

</script>


<style scoped>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";
@import "https://use.fontawesome.com/releases/v5.4.1/css/all.css";


body {
    font-family: 'Poppins', sans-serif;
    background: #fafafa;
}

p {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1em;
    font-weight: 300;
    line-height: 1.7em;
    color: #999;
}

a, a:hover, a:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;  
}

.wrapper {
    font-family: 'Poppins', sans-serif;
    display: flex;
    width: 100%;
    align-items: stretch;
}

#sidebar {
    min-width: 250px;
    max-width: 250px;
    min-height: 100vh;
    background: #264653;
    color: #fff;
    transition: all 0.3s;
}

#sidebar .sidebar-header {
    margin-top: 2em;
    margin-bottom: 2em;
}

#sidebar ul.components {
    padding: 20px 0;
}

#sidebar ul p {
    color: #fff;
    padding: 10px;
}

#sidebar ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
}
#sidebar ul li a:hover {
    color: #264653;
    background: #fff;
}

#sidebar.active {
    margin-left: -250px;
}

#content{
  min-height: 100vh;
  min-width: 85vw;
  max-width: 100vw;
}

#sidebar ul li.active > a, a[aria-expanded="true"] {
    color: #fff;
    background: #264653;
}

ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: #264653;
}

a[data-toggle="collapse"] {
    position: relative;
}

.dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
}

@media (max-width: 768px) {
    #sidebar {
        margin-left: -250px;
    }
    #sidebar.active {
        margin-left: 0;
    }
}
</style>