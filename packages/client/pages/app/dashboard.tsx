import type { NextPage } from "next";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Input from "@client/components/forms/input";
import Select from "@client/components/forms/select";
import AppLayout from "@client/layouts/app";

const Dashboard: NextPage = () => (
  <AppLayout title="Dashboard">
    <div className="flex flex-col gap-4">
      <Input label="Search" icon={SearchOutlinedIcon} type="text" />
      <Input icon={SearchOutlinedIcon} type="text" />
      <Input label="Search" type="text" />
      <Select icon={SearchOutlinedIcon} label="Select">
        <option value="">Option 1</option>
        <option value="">Option 2</option>
      </Select>
    </div>
    <p className="mb-4">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt magni voluptates facilis et
      soluta porro minus modi quibusdam aliquam? Ipsam dicta doloremque ut minus debitis, quidem
      dolorum explicabo est consequuntur cum eveniet? Sed minima suscipit deleniti error, quo
      dolorem saepe provident in est nobis! Consequuntur labore natus excepturi nostrum. Nobis
      tempore id odio sunt magni sequi culpa corporis dolorum minima doloribus. Iusto sint illum
      quas, mollitia vel, amet eligendi dolores magni cupiditate enim, commodi tempore. Fuga
      excepturi optio, eum sequi explicabo quo quaerat quae reprehenderit, aliquid repellendus vero?
      Magni deleniti architecto facere laborum vero blanditiis sint eaque placeat quae harum.
    </p>
    <p className="mb-4">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet rem error atque doloribus,
      neque aliquid esse, ducimus nostrum possimus inventore et sunt laborum porro officia, saepe
      voluptas asperiores eius culpa dolorum dignissimos! Cum explicabo magnam ut, distinctio
      dignissimos natus illum vel quia, aspernatur unde quae itaque provident ad omnis ab numquam.
      Laboriosam illum totam animi at dignissimos? Fugiat perferendis atque maxime repellat
      voluptates explicabo doloremque inventore harum esse tempora? Iste aspernatur, id voluptatem
      ab, nobis odit sunt vel omnis fuga animi assumenda numquam similique! Pariatur quos delectus
      ea, cum deleniti cupiditate eveniet aut mollitia quis odit, culpa perferendis inventore atque!
      Earum fugiat, porro atque consequatur at tenetur, exercitationem expedita totam dignissimos
      nesciunt, beatae reiciendis quae voluptatum ullam! Doloremque totam sed ullam, exercitationem
      quia harum tenetur! Corrupti consequatur laboriosam, harum, minus hic dolorem adipisci
      nesciunt ducimus deleniti non veniam eius totam natus asperiores! Ipsa magni alias
      voluptatibus quod consequatur hic culpa earum aperiam sed sunt minus laboriosam perferendis
      perspiciatis architecto, provident porro placeat neque aliquid qui molestiae illo! Deserunt
      sunt nemo neque, natus esse odit in magnam doloribus voluptatum explicabo rem dolores iure
      perferendis rerum repudiandae, incidunt totam ullam nobis dolore doloremque! Non autem rerum
      sed aliquid at, omnis dolore commodi.
    </p>
    <p className="mb-4">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit culpa in dolorum, fugiat
      soluta, ullam odit nihil eaque adipisci dicta inventore quasi qui vero iure nemo consequatur
      nulla, pariatur non autem architecto deleniti rem assumenda doloribus hic? Maxime consectetur,
      magni quisquam praesentium quidem voluptatibus, adipisci delectus eveniet velit impedit
      suscipit! Necessitatibus explicabo sunt illum voluptatem voluptatibus. Nulla facilis rerum
      fuga repellat inventore, eligendi voluptates est assumenda doloribus quis autem minima ipsa
      dignissimos repellendus vel? Ratione consequuntur perspiciatis amet. Sequi, esse vel
      voluptatem laborum quia, minus adipisci labore saepe et eveniet consectetur nobis. Cum facere
      porro dolores qui autem illo assumenda.
    </p>
    <p className="mb-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora iusto nesciunt obcaecati
      expedita incidunt fugiat animi sit non laudantium culpa nam labore, qui, atque porro. Totam
      quibusdam soluta quam tempora facere, aperiam libero dicta perspiciatis officiis ab, eos ad
      vitae distinctio labore veritatis ut accusamus, obcaecati perferendis itaque? Amet expedita
      eaque maxime, maiores alias laudantium error iure, magnam aperiam dolor quia non consequuntur
      dignissimos nihil aspernatur perferendis placeat quis porro cum ducimus reprehenderit veniam
      fuga explicabo! Optio, suscipit ea. Eaque debitis veniam quas perferendis quos, rerum
      obcaecati. Accusamus dolor molestiae temporibus? Maiores pariatur ea delectus, minus et
      exercitationem veritatis beatae corporis natus illum facere ullam recusandae dolore ad neque
      reiciendis architecto unde iusto expedita eum fuga vitae, reprehenderit qui vero. At
      voluptatum vel iure provident fugiat atque dolores minima, ipsa mollitia officia omnis
      perspiciatis alias illum aspernatur iusto ducimus explicabo placeat? Ea sint ratione quis
      nihil accusantium, sequi mollitia et. Dolorem vero libero enim, cumque nam vitae hic quis odit
      eligendi eum id aspernatur cupiditate ducimus, labore quibusdam numquam debitis nobis maiores
      adipisci quas possimus autem accusantium? Earum harum cum quaerat placeat hic? Consequuntur
      nesciunt unde sit rem vero nemo quidem, quaerat mollitia, inventore assumenda natus quae. Est
      quasi adipisci id veniam ipsum eveniet hic? Voluptates, optio sapiente aspernatur quam nihil
      blanditiis libero eaque cumque, officiis illo laudantium, saepe nulla sit ad velit vero? Ea
      ratione illo esse ex, est quae at eligendi obcaecati, itaque veritatis, asperiores optio
      perferendis soluta? Rerum, quod. Esse nostrum eaque ex, voluptatem nihil blanditiis nobis.
      Eveniet veniam accusamus consequatur similique, accusantium quo, ullam dolor qui perferendis
      quas enim voluptatibus tempora nulla amet ipsum? Cumque magni iste quas facilis aut quidem,
      est dignissimos nesciunt iure voluptas sunt corporis laborum labore accusantium molestias
      distinctio facere perspiciatis recusandae ipsum voluptatibus autem perferendis repellendus
      molestiae nostrum. Ipsa, recusandae aspernatur.
    </p>
  </AppLayout>
);

export default Dashboard;
