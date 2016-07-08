<div class="animated fadeInRight">
  <section class="contact">
    <div class="container">
      <div class="row">
        <div class="col-md-5">

          <br>
          <form id="contact-form" action="form.php" method="POST" role="form">

            <div class="form-group">
              <label for="name">Name:<sup>*</sup></label>
              <input type="text" name="name" class="form-control" id="name" placeholder="Enter your name" required>
            </div>
            <div class="form-group">
              <label for="address">Address:</label>
              <textarea type="text" name="address" class="form-control" id="address" placeholder="Enter your address"></textarea>
            </div>
            <div class="form-group">
              <label for="phone">Phone:<sup>*</sup></label>
              <input type="tel" name="phone" class="form-control" id="phone" placeholder="Enter your phone" required>
            </div>
            <div class="form-group">
              <label for="email">Email:<sup>*</sup></label>
              <input type="email" name="email" class="form-control" id="email" placeholder="Enter your email" required>
            </div>
            <div class="form-group">
              <label for="interest">Interested in residential or commercial?</label>
              <select name="interest" id="interest" class="form-control">
                <option>Residential</option>
                <option>Commercial</option>
              </select>
            </div>

            <div class="form-group">
              <div class="g-recaptcha" data-sitekey="6LeghSQTAAAAACS8BOTlLuuLUqnLGrQvnBhiNL9_"></div>
            </div>

            <div class="form-group">
              <button type="submit" class="btn btn-contact">Submit</button>
              <button type="reset" class="btn btn-contact">Clear</button>
            </div>

            <div class="form-group">
              <div id="form-messages"></div>
            </div>

          </form>


        </div>
      </div>
    </div>

  </section>
</div>
