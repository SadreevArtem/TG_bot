console.log(
  'qrator_jsid=1710766602.914.SHvQcanMpg1NpXax-5ljf6iumic03tifqk6smd9dsuevriu11;qrator_jsr=1710766602.914.SHvQcanMpg1NpXax-d69l95fub1e85pvmemuur6s5v7busjq7-00'
    .split(';')
    .map((el) => {
      const [key, value] = el.split('=');
      return {
        name: key,
        value,
      };
    }),
);