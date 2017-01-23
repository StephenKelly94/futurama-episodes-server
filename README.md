# Server
----
An express application serving all futurama episodes from a mongo database.

**Show Episodes**
----
Returns json data about futurama episodes.

* **URL**

  /api/episodes/

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   **Optional:**
   `episode=[integer]`
   `amount=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />

* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "No episodes exist" }`


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/episodes",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

  **Show Episode**
  ----
    Returns json data about a single episode.

  * **URL**

    /api/episodes/:id

  * **Method:**

    `GET`

  *  **URL Params**

    None

  * **Data Params**

    None

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:**
      ```javascript
      {
        _id: "5885e2aa867876000457f0f1",
        imageUrl:"http://static.tvmaze.com/uploads/images/original_untouched/57/144196.jpg",
        season: 6,
        episode: 22,
        title: "Fry am the Egg Man",
        episode_num: 93,
        __v: 0
      }
      ```

  * **Error Response:**

    * **Code:** 404 Not Found <br />
      **Content:** `{ error : "Episode not found" }`


  * **Sample Call:**

    ```javascript
      $.ajax({
        url: "/api/episodes/5885e2aa867876000457f0f1",
        dataType: "json",
        type : "GET",
        success : function(r) {
          console.log(r);
        }
      });
    ```
