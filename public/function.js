//Load in character data
d3.json("chars.json", function (data) {
  //Load in character data
  d3.json("https://gist.githubusercontent.com/andybarefoot/172ebdb29e781a71625753ab02f4920d/raw/ced130d481e3b363fa053bffc37034139eb1e670/chars.json", function (data) {
    grid = d3.select("main")
      .append("div")
      .attr("id", "grid")
      .attr("class", "grid")
      ;
    chars = grid
      .selectAll("div")
      .data(data.characters)
      .enter()
      .append("div")
      .attr("class", "char")
      ;
    chars
      .style("background-image", function (d) {
        return 'url("https://raw.githubusercontent.com/andybarefoot/andybarefoot-www/master/got/images/sigil/' + d.charSigil + '?raw=true")';
      })
      ;
    content = chars
      .append("div")
      .attr("class", "charContent")
      ;
    content
      .append("h2")
      .text(function (d, i) {
        return d.charName;
      })
      ;
    chars
      .filter(function (d) { return d.totalAppearances >= 1; })
      .classed("size4", true)
      .filter(function (d) { return d.totalAppearances > 5; })
      .classed("size5", false)
      .classed("size5", true)
      .filter(function (d) { return d.totalAppearances > 10; })
      .classed("size5", false)
      .classed("size5", true)
      .filter(function (d) { return d.totalAppearances > 30; })
      .classed("size5", false)
      .classed("size5", true)
      .filter(function (d) { return d.totalAppearances > 50; })
      .classed("size5", false)
      .classed("size5", true)
      ;

    chars
      .on("click", function (d, i) {
        if (this.className.split(' ').indexOf('open') > -1) {
          d3.select(this).classed("open", false);
        } else {
          gridColumns = window.getComputedStyle(this.parentElement).gridTemplateColumns.split(" ");
          gridRows = window.getComputedStyle(this.parentElement).gridTemplateRows.split(" ");
          numColumns = gridColumns.length;
          numRows = gridRows.length;
          xPosInGrid = this.getBoundingClientRect().left - this.parentElement.getBoundingClientRect().left;
          yPosInGrid = this.getBoundingClientRect().top - this.parentElement.getBoundingClientRect().top;
          gridRowHeight = parseFloat(gridRows[0]) + parseFloat(window.getComputedStyle(this.parentElement).gridRowGap);
          gridColumnWidth = parseFloat(gridColumns[0]) + parseFloat(window.getComputedStyle(this.parentElement).gridColumnGap);
          thisRow = Math.round(yPosInGrid / gridRowHeight) + 1;
          thisColumn = Math.round(xPosInGrid / gridColumnWidth) + 1;
          thisPortrait = this.getElementsByClassName("portrait")[0];
          if (thisPortrait) thisPortrait.setAttribute("src", thisPortrait.getAttribute("data-src"));
          chars.classed("open", false);
          chars.style("grid-row-start", "auto");
          chars.style("grid-column-start", "auto");
          d3.select(this).classed("open", true);
          divWidth = parseFloat(window.getComputedStyle(this).gridColumnEnd.split(" ")[1]);
          divHeight = parseFloat(window.getComputedStyle(this).gridRowEnd.split(" ")[1]);
          if (thisRow + divHeight > numRows) thisRow = 1 + numRows - divHeight;
          if (thisColumn + divWidth > numColumns) thisColumn = 1 + numColumns - divWidth;
          d3.select(this).style("grid-row-start", thisRow)
          d3.select(this).style("grid-column-start", thisColumn)
        }
      })
      ;

    details = content
      .append("div")
      .attr("class", "details")
      ;

    imageHolder = details
      .filter(function (d) { return d.charThumb != ""; })
      .append("div")
      .attr("class", "imageHolder")
      ;
    imageHolder
      .append("img")
      .attr("class", "portrait")
      .attr("data-src", function (d, i) {
        return "https://raw.githubusercontent.com/andybarefoot/andybarefoot-www/master/got/images/char" + d.charID + ".png";
      })
      ;
    bio = details
      .append("div")
      .attr("class", "bio")
      ;
    bio
      .append("h3")
      .text(function (d, i) {
        return d.charName;
      })
      ;
    bio
      .filter(function (d) { return d.charAllegiance != ""; })
      .append("h4")
      .text("Allegiance:")
      ;
    bio
      .filter(function (d) { return d.charAllegiance != ""; })
      .append("span")
      .text(function (d, i) {
        return d.charAllegiance;
      })
      ;
    bio
      .filter(function (d) { return d.charCulture != ""; })
      .append("h4")
      .text("Culture:")
      ;
    bio
      .filter(function (d) { return d.charCulture != ""; })
      .append("span")
      .text(function (d, i) {
        return d.charCulture;
      })
      ;
    bio
      .filter(function (d) { return d.charOrigin != ""; })
      .append("h4")
      .text("Origin:")
      ;
    bio
      .filter(function (d) { return d.charOrigin != ""; })
      .append("span")
      .text(function (d, i) {
        return d.charOrigin;
      })
      ;
    bio
      .filter(function (d) { return d.charReligion != ""; })
      .append("h4")
      .text("Religion:")
      ;
    bio
      .filter(function (d) { return d.charReligion != ""; })
      .append("span")
      .text(function (d, i) {
        return d.charReligion;
      })
      ;
    bio
      .append("div")
      .attr("class", "bioLink")
      .append("a")
      .attr("href", function (d) { return d.charURL })
      .attr("target", "_blank")
      .text("More Details >>")
      ;

  })


})