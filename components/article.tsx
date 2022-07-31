import { FC } from "react";

const Article: FC<{ authorElement: FC }> = ({ authorElement: Author }) => (
  <article>
    <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
    <Author />
    <div className="lead">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus tellus eu nibh facilisis
      tincidunt. Vivamus eu sollicitudin magna. Quisque consequat quis magna nec varius. Integer
      sapien ipsum, sodales vitae odio sed, commodo euismod diam. Proin porttitor ex non commodo
      ornare. Nulla ut condimentum enim, ac aliquam lorem. Ut scelerisque, augue ut placerat
      sollicitudin, velit mi blandit nunc, vitae commodo elit dui in mauris. Duis auctor porttitor
      semper.
    </div>
    <p>
      Maecenas vestibulum felis nec ipsum cursus tempus. Etiam condimentum lorem in felis consequat,
      sit amet lobortis sem feugiat. Vivamus tincidunt mi ut elementum tincidunt. Sed venenatis,
      lectus eu ultricies eleifend, turpis mi hendrerit enim, vel maximus metus ante ut augue. Etiam
      non erat vel libero dapibus dictum non ut nulla. Mauris commodo vel mauris ac vehicula.
      Curabitur facilisis, nunc vel tempor ultrices, ipsum erat vulputate urna, a finibus lacus dui
      quis eros. Vestibulum id consectetur lorem. Cras consequat urna non lacus laoreet cursus. In
      nec lobortis nunc. Proin fermentum sapien in justo suscipit, facilisis venenatis elit
      porttitor. Phasellus blandit dui lacus, sit amet venenatis mi sollicitudin ac. Lorem ipsum
      dolor sit amet, consectetur adipiscing elit. Sed maximus pulvinar mi eget venenatis. Mauris
      erat nibh, semper condimentum dui vitae, consequat ultrices justo.
    </p>
    <p>
      Nulla non efficitur diam. Phasellus gravida nec leo vel facilisis. Nunc molestie nunc eu
      turpis hendrerit, sed lacinia massa malesuada. Nunc at metus pulvinar, vestibulum dolor vitae,
      blandit libero. Nulla condimentum imperdiet varius. Fusce luctus nibh ultrices rhoncus
      pellentesque. Vestibulum tempor nibh accumsan mauris gravida sodales. Morbi nec mauris
      tincidunt, accumsan massa ac, semper nulla. Morbi interdum semper nulla. Nam convallis sit
      amet enim ut tristique. Vestibulum maximus ante volutpat odio pretium scelerisque. Sed
      porttitor interdum elit nec ullamcorper. Proin suscipit ullamcorper velit, id dapibus ipsum
      dignissim et.
    </p>
  </article>
);

export default Article;
