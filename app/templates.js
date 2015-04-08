var JST = {};

JST['songs'] = _.template(`
<div class="row">
    <div class="col-sm-12">
        <h1>Hello Backbone <a href="#/add" class="btn btn-default pull-right">Add new song</a></h1>

        <div class="row">
            <div class="col-sm-12">
                <button action="sort" by="author" class="btn btn-default">
                    <i class="glyphicon glyphicon-chevron-down"></i>
                    Author
                </button>
                <button action="sort" by="title" class="btn btn-default">
                    <i class="glyphicon glyphicon-chevron-down"></i>
                    Title
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <input class="form-control" type="text" id="filter" placeholder="Filter..."/>
            </div>
        </div>
        <ul class="list-group"></ul>
    </div>
</div>
`);

JST['form'] = _.template(`
<div class="row">
    <h2 class="col-sm-12">Add a new song</h2>
    <form class="col-sm-12">
        <div class="form-group">
            <label for="author">Author</label>
            <input type="text" name="author" id="author" class="form-control" value="<%= author %>"/>
        </div>

        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" class="form-control" value="<%= title %>"/>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-success">Submit</button>
            <a href="#/" type="submit" class="btn btn-default">Back</a>
        </div>
    </form>
</div>
`);

module.exports = JST;