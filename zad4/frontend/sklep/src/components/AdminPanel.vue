<template>
  <div>
    <div v-if="isLoggedIn">
      <h2>Witaj w panelu administratora!</h2>
      <!-- Display unfulfilled orders -->
      <div v-if="unfulfilledOrders.length > 0">
        <h3>Niezrealizowane zamówienia</h3>
        <table class="table table-striped table-bordered">
          <thead>
          <tr>
            <th>Data Zamówienia</th>
            <th>Wartość</th>
            <th>Produkt</th>
            <th>Akcja</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="order in unfulfilledOrders" :key="order.idZamowienie">
            <td>{{ formatDate(order.data_zamowienia) }}</td>
            <td>{{ calculateOrderValue(order.products) }}</td>
            <td>
              <ul>
                <li v-for="product in order.products" :key="product.id">
                  {{ product.nazwa_produktu }} - {{ product.ilosc }} sztuki
                </li>
              </ul>
            </td>
            <td>
              <button @click="markAsRealized(order.idZamowienie)" class="btn btn-success">Mark as Realized</button>
              <button @click="markAsCancelled(order.idZamowienie)" class="btn btn-danger">Mark as Cancelled</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-for="(statusOrders, status) in ordersByStatus" :key="status">
        <h3>{{ getStatusLabel(Number(status)) }}</h3>
        <table class="table table-striped table-bordered">
          <!-- Table header -->
          <thead>
          <tr>
            <th>Data Zamówienia</th>
            <th>Wartość</th>
          </tr>
          </thead>
          <!-- Table body -->
          <tbody>
          <!-- Loop through orders with the current status -->
          <tr v-for="order in statusOrders" :key="order.idZamowienie">
            <!-- Display order details -->
            <td>{{ formatDate(order.data_zamowienia) }}</td>
             <td>{{ calculateOrderValue(order.products) }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <!-- Login form -->
      <h2>Login to access the Admin Panel</h2>
      <form @submit.prevent="login">
        <label for="username">Username:</label>
        <input type="text" v-model="username" required/>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required/>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  data() {
    return {
      username: "",
      password: "",
      isLoggedIn: false,
      unfulfilledOrders: [],
      orders: [],
    };
  },
  computed: {
    ordersByStatus() {
      return this.orders.reduce((result, order) => {
        const status = order.Stan_Zamowienia_idStan_Zamowienia;
        if (!result[status]) {
          result[status] = [];
        }
        result[status].push(order);
        return result;
      }, {});
    },
  },
  methods: {
    getStatusLabel(status) {
      switch (status) {
        case 1:
          return 'Niezatwierdzone zamówienia';
        case 2:
          return 'Zatwierdzone zamówienia';
        case 3:
          return 'Anulowane zamówienia';
        case 4:
          return 'Zrealizowane zamówienia';
        default:
          return 'Nieznany status zamówienia';
      }
    },
    fetchAllOrders() {
      axios.get('http://localhost:3000/orders')
          .then(response => {
            this.orders = response.data;
            this.orders.forEach((order) => {
              this.fetchProductsForOrderStatus(order.idZamowienie, order.Stan_Zamowienia_idStan_Zamowienia);
            });
          })
          .catch(error => {
            console.error('Błąd:', error);
          });
    },
    formatDate(dateString) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
      };
      const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
      return formattedDate;
    },
    calculateOrderValue(products) {
      if (!Array.isArray(products) || products.length === 0) {
        return 0; // or any default value you prefer
      }

      return products.reduce((total, product) => {
        // Convert the values to numbers before multiplication
        const price = Number(product.cena_jednostkowa);
        const quantity = Number(product.ilosc);

        // Check if the values are valid numbers
        if (!isNaN(price) && !isNaN(quantity)) {
          // Multiply the price by the quantity for each product
          return total + (price * quantity);
        } else {
          console.error("Invalid price or quantity:", product);
          return total;
        }
      }, 0).toFixed(2); // Assuming you want the result rounded to two decimal places

  },
    login() {
      // Check if the entered credentials are correct
      if (this.username === "admin" && this.password === "admin") {
        this.isLoggedIn = true;
      } else {
        alert("Invalid username or password");
      }
    },
    // Fetch unfulfilled orders
    fetchUnfulfilledOrders() {
      axios.get("http://localhost:3000/orders/status/1")
          .then((response) => {
            this.unfulfilledOrders = response.data;

            // Fetch products for each order
            this.unfulfilledOrders.forEach((order) => {
              this.fetchProductsForOrder(order.idZamowienie);
            });
          })
          .catch((error) => {
            console.error("Error fetching unfulfilled orders:", error);
          });
    },

    fetchProductsForOrder(orderId) {
      if (!orderId) {
        console.error('Invalid orderId:', orderId);
        return;
      }
      // Fetch products for a specific order
      axios.get(`http://localhost:3000/products/order/${orderId}`)
          .then((response) => {
            // Find the corresponding order and update its products
            const orderIndex = this.unfulfilledOrders.findIndex((order) => order.idZamowienie === orderId);
            if (orderIndex !== -1) {
              this.unfulfilledOrders[orderIndex] = {
                ...this.unfulfilledOrders[orderIndex],
                products: response.data.map(product => ({
                  nazwa_produktu: product.nazwa_produktu,
                  ilosc: product.ilosc,
                  cena_jednostkowa: product.cena_jednostkowa,
                })),
              };

            }
          })
          .catch((error) => {
            console.error(`Error fetching products for order ${orderId}:`, error);
          });
    },

    fetchProductsForOrderStatus(orderId, status) {
      if (!orderId || !status) {
        console.error('Invalid orderId or status:', orderId, status);
        return;
      }

      axios.get(`http://localhost:3000/products/order/${orderId}`)
          .then((response) => {
            const statusOrders = this.orders;
            const orderIndex = statusOrders.findIndex((order) => order.idZamowienie === orderId);

                if (orderIndex !== -1) {
                  this.orders[orderIndex] = {
                    ...this.orders[orderIndex],
                    products: response.data.map(product => ({
                      nazwa_produktu: product.nazwa_produktu,
                      ilosc: product.ilosc,
                      cena_jednostkowa: product.cena_jednostkowa,
                    })),
                  };
          }
          })
          .catch((error) => {
            console.error(`Error fetching products for order ${orderId}:`, error);
          });
    },


    // Mark order as realized
    markAsRealized(orderId) {
      // Implement the logic to update the order status to REALIZED (Stan_Zamowienia_idStan_Zamowienia: 4)
      this.updateOrderStatus(orderId, 4);
    },

    markAsCancelled(orderId) {
      // Implement the logic to update the order status to CANCELLED (Stan_Zamowienia_idStan_Zamowienia: 3)
      this.updateOrderStatus(orderId, 3);
    },

    updateOrderStatus(orderId, newStatus) {
      // Make a PATCH request to update the order status
      const newState = {
        Stan_Zamowienia_idStan_Zamowienia: newStatus,
      };

      axios.patch(`http://localhost:3000/orders/${orderId}`, newState)
          .then(response => {
            if (response.data && response.data.message) {
              // Assuming you want to update the local state after a successful API call
              const orderIndex = this.unfulfilledOrders.findIndex(order => order.idZamowienie === orderId);
              if (orderIndex !== -1) {
                // Update the local state with the new order status
                this.unfulfilledOrders[orderIndex] = {
                  ...this.unfulfilledOrders[orderIndex],
                  Stan_Zamowienia_idStan_Zamowienia: newStatus,
                };

              }
            } else {
              console.error('Invalid response format:', response.data);
            }
          })
          .catch(error => {
            console.error(error.response.data);
          }).finally(() => {
        window.location.reload();
      });
    },

  },

  mounted() {
    // Fetch unfulfilled orders when the component is mounted
    this.fetchUnfulfilledOrders();
    this.fetchAllOrders();
  },
};
</script>

<style>
/* Add styles if needed */
</style>
