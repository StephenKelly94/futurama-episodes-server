# Server
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
    ```json
    {
      _id: "5887643666e76c2c4fff17b5",
      image_url: "http://static.tvmaze.com/uploads/images/original_untouched/57/143950.jpg",
      episode_url: "http://www.tvmaze.com/episodes/49288/futurama-1x01-space-pilot-3000",
      airdate: "1999-03-28T00:00:00.000Z",
      season: 1,
      episode: 1,
      summary: "A delivery boy frozen in the year 1999 awakens in the year 3000. Phillip J. Fry delivers a pizza to a Cryogenics lab on New Years eve, only to discover that it is a prank delivery and then accidentally falls into a open cryogenics chamber, is put to sleep and wakes up in the far future.",
      title: "Space Pilot 3000",
      episode_num: 0,
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

**Show Season**
----
  Returns json data of every episode in a season.

* **URL**

  /api/season/:season_number

* **Method:**

  `GET`

*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />

* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** `{ error : "Season does not exist" }`


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/season/1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
